import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../core/user/user.service';
import { MainComponent } from '../../../../core/models/main-component.class';
import { debounceTime, delay, distinctUntilChanged, filter, switchMap, take, takeUntil } from 'rxjs/operators';
import { MyErrorStateMatcher } from '../../../../core/helpers/forms.helper';
import { environment } from '../../../../../environments/environment';
import { ImageService } from '../../../../core/image/image.service';
import { ItemsService } from '../../../../core/items/items.service';
import { IItem } from '../../../../core/interfaces/item.interface';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent extends MainComponent implements OnInit {

  public readonly imageInfo = `We use this service ${environment.imageUrl} to generate random images`;
  public itemForm: FormGroup;
  public matcher = new MyErrorStateMatcher();

  private userEmail: string;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private imageService: ImageService,
              private itemsService: ItemsService,
              private router: Router,
              private location: Location) {
    super();
  }

  ngOnInit(): void {
    this.getUserEmail();
    this.init();
  }

  public save(): void {
    if (this.itemForm.invalid) {
      return;
    }
    const id = +this.route.snapshot.params.id;
    (id ? this.itemsService.updateItem({...this.itemForm.value, id}) :
      this.itemsService.saveNewItem({...this.itemForm.value, id: new Date().getTime()})).pipe(
      take(1),
      delay(120)
    ).subscribe((responce: boolean) => {
      if (responce) {
        this.router.navigate(['items']);
      }
    });
  }

  public goBack(): void {
    this.location.back();
  }

  private getUserEmail(): void {
    this.userService.getUserEmail().pipe(
      takeUntil(this.unsubscriber)
    ).subscribe((email: string) => this.userEmail = email);
  }

  private init(): void {
    const id = this.route.snapshot.params.id;
    if (id) {
      this.getItemById(+id);
    } else {
      this.initForm();
      this.subscribeOnImageIdChange();
    }
  }

  private initForm(): void {
    this.itemForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      subTitle: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      imageUrl: new FormControl(''),
      imageId: new FormControl('', [Validators.required, Validators.max(100), Validators.min(1)])
    });
  }

  private getItemById(id: number): void {
    this.itemsService.getItemById(id).pipe(
      take(1),
      filter((item: IItem) => !!item)
    ).subscribe((item: IItem) => {
      this.initForm();
      this.subscribeOnImageIdChange();
      this.itemForm.patchValue(item);
    });
  }

  private subscribeOnImageIdChange(): void {
    this.itemForm.get('imageId').valueChanges.pipe(
      takeUntil(this.unsubscriber),
      debounceTime(300),
      distinctUntilChanged(),
      filter((id: number) => !this.itemForm.get('imageId').invalid && id === +id),
      switchMap((id: number) => this.imageService.getDownloadLink(`${id}`))
    ).subscribe((link: string) => this.itemForm.get('imageUrl').setValue(link));
  }

}
