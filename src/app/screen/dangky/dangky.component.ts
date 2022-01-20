import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Captcha } from './captcha.model';
import { SignupService } from './signup.service';
import { User } from './user.model';
import * as CryptoJS from 'crypto-js';
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { Title } from '@angular/platform-browser';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Component({
  selector: 'app-dangky',
  templateUrl: './dangky.component.html',
  styleUrls: ['./dangky.component.css']
})
export class DangkyComponent implements OnInit {
    @BlockUI()
  blockUI!: NgBlockUI;
  notification = "";
    formType = 1; // 1: Đăng ký - 2: Đăng nhập
    btnName = "Đăng Ký";
    signUpHidden = false;
    captcha = new Captcha();

    @ViewChild("btnSubmitArea", { static: false })
    btnSubmitArea!: ElementRef;

    @ViewChild("btnSignUp", { static: false })
    btnSignUp!: ElementRef;

    @ViewChild("btnSignIn", { static: false })
    btnSignIn!: ElementRef;

    userForm = this.formBuilder.group({
        playerid: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(13)]],
        password: ["", [Validators.required]],
        firstname: [""],
        mobile: ["", [Validators.pattern("^[0-9]*$"), Validators.maxLength(10)]],
        captcha: ["", [Validators.required, Validators.maxLength(4)]]
    });

  constructor(private homeService:SignupService,private formBuilder: FormBuilder,private titleService: Title) {
    titleService.setTitle('Đăng ký - Đăng nhập - Chuyển động sân cỏ');
    this.blockUI.start('Loading...');
        setTimeout(() => {
            this.blockUI.stop();
        }, 500); 
   }

  ngOnInit(): void {
    this.getCaptcha();
  }
  public getCaptcha() {
    this.homeService.getCaptcha().toPromise().then((value:any) => {
        this.captcha = value;
    });
}

notify() {
    const playerIdNotification = document.getElementById('playerid-notification');
    const passwordNotification = document.getElementById('password-notification');
    const mobileNotification = document.getElementById('mobile-notification');
    const firstnameNotification = document.getElementById('firstname-notification');
    if (this.formType === 1) {
        if (!this.userForm.value.playerid) {
            if (playerIdNotification) {
                playerIdNotification.innerText = "Hãy nhập tên đăng nhập!";
            }
        }
        else {
            if (this.userForm.value.playerid.length < 5 || this.userForm.value.playerid.length > 13) {
                if (playerIdNotification) {
                    playerIdNotification.innerText = "Giới hạn từ 5-13 ký tự!";
                }
            }
        }

        if (!this.userForm.value.password) {
            if (passwordNotification) {
                passwordNotification.innerText = "Hãy nhập mật khẩu!";
            }
        }

        if (!this.userForm.value.mobile) {
            if (mobileNotification) {
                mobileNotification.innerText = "Hãy nhập số điện thoại!";
            }
        }
        else {
            if (this.userForm.value.mobile.length > 10) {
                if (mobileNotification) {
                    mobileNotification.innerText = "Số điện thoại không đúng!";
                }
            }
        }

        if (!this.userForm.value.firstname) {
            if (firstnameNotification) {
                firstnameNotification.innerText = "Hãy nhập họ và tên!";
            }
        }
    }
    else if (this.formType === 2) {
        if (!this.userForm.value.playerid) {
            if (playerIdNotification) {
                playerIdNotification.innerText = "Hãy nhập tên đăng nhập!";
            }
        }
        else {
            if (this.userForm.value.playerid.length < 5 || this.userForm.value.playerid.length > 13) {
                if (playerIdNotification) {
                    playerIdNotification.innerText = "Giới hạn từ 5-13 ký tự!";
                }
            }
        }

        if (!this.userForm.value.password) {
            if (passwordNotification) {
                passwordNotification.innerText = "Hãy nhập mật khẩu!";
            }
        }
    }
}
onSubmit(): void {
    const url = "https://www.jun82.com/";
    if (this.formType === 1) {
        if (this.userForm.value.mobile) {
            let first = this.userForm.value.mobile.charAt(0);
            if (first != 0) {
                const mobileNotification = document.getElementById('mobile-notification');
                if (mobileNotification) {
                    mobileNotification.innerText = "Số điện thoại không đúng!";
                }
                return;
            }
        }

        if (this.userForm.valid) {
            var formData = new FormData();
            formData.append("playerid", this.userForm.value.playerid);
            var hash = CryptoJS.HmacSHA1(this.userForm.value.password, this.userForm.value.playerid);
            formData.append("password", hash.toString());
            formData.append("ulagentaccount", "bongda88");
            formData.append("currency", "VND2");
            formData.append("firstname", this.userForm.value.firstname);
            formData.append("pin", hash.toString());
            var rewisedPhoneNumber = this.userForm.value.mobile.substring(1);
            rewisedPhoneNumber = "84 " + rewisedPhoneNumber;
            formData.append("mobile", rewisedPhoneNumber);
            formData.append("im1", "");
            var portalid = "";
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                portalid = "EC_MOBILE";
            } else {
                portalid = "EC_DESKTOP";
            }
            formData.append("portalid", portalid);
            formData.append("captchauuid", this.captcha.uuid);
            formData.append("captcha", this.userForm.value.captcha);
            formData.append("language", "4");

            const fpPromise = FingerprintJS.load();
            (async () => {
                const fp = await fpPromise
                const result = await fp.get()
                const visitorId = result.visitorId
                formData.append("regfingerprint", visitorId);
            })()
            var res = this.homeService.register(formData).toPromise();
            res.then(value => {
                let redirectUrl = url + "?token=" + value.token;
                window.location.href = redirectUrl;
            });
            res.catch(value => {
                if (value.error.code === 0) {
                    this.notification = "Số điện thoại không đúng!";
                }
                if (value.error.code === 1) {
                    this.notification = "Sai mã xác nhận!";
                }
                else if (value.error.code === 2) {
                    this.notification = "Tài khoản đã được đăng ký!";
                }
                else if (value.error.code === 4) {
                    this.notification = "Số điện thoại đã được đăng ký!";
                }
            });
        }
        else {
            this.notify();
        }
    }
    else if (this.formType === 2) {
        if (this.userForm.valid) {
            let user = new User();
            user.loginname = this.userForm.value.playerid;
            var hash = CryptoJS.HmacSHA1(this.userForm.value.password, this.userForm.value.playerid);
            user.loginpassword = hash.toString();
            var portalid = "";
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                portalid = "EC_MOBILE";
            } else {
                portalid = "EC_DESKTOP";
            }
            user.portalid = portalid;
            const fpPromise = FingerprintJS.load();
            (async () => {
                const fp = await fpPromise
                const result = await fp.get()
                const visitorId = result.visitorId
                user.fingerprint = visitorId;
            })()
            user.captchauuid = this.captcha.uuid;
            user.captcha = this.userForm.value.captcha;
            var response = this.homeService.login(user).toPromise();
            response.then(value => {
                let redirectUrl = url + "?token=" + value.token;
                window.location.href = redirectUrl;
            });
            response.catch(value => {
                if (value.error.code === 1) {
                    this.notification = "Sai mã xác nhận!";
                    this.getCaptcha();
                }
                else if (value.error.code === 2) {
                    this.notification = "Sai tên đăng nhập hoặc mật khẩu!";
                    this.getCaptcha();
                }
            });
        }
        else {
            this.notify();
        }
    }
    this.getCaptcha();
}

public removeAccents(str: string) {
    return str.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D');
}

public firstNameValidate(event: any) {
    let firstnameInput = document.getElementById("firstname") as HTMLInputElement;

    var name = this.removeAccents(event.target.value.toUpperCase());
    if (firstnameInput) {
        firstnameInput.value = name;
    }
}

public phoneNumberValidate(event: any) {
    var length = event.target.value.length;
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar) || length > 15) {
        event.preventDefault();
    }
}

public captchaValidate(event: any) {
    var length = event.target.value.length;
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar) || length > 3) {
        event.preventDefault();
    }
}

public loginArea(event: any) {
    this.getCaptcha();
    this.formType = 2;
    this.btnSignUp.nativeElement.classList.remove("bg-white");
    this.btnSignUp.nativeElement.classList.remove("text-primary");
    this.btnSignUp.nativeElement.classList.remove("font-weight-bold");
    this.btnSignUp.nativeElement.classList.add("bg");
    this.btnSignUp.nativeElement.classList.add("text-white");

    event.target.classList.remove("bg");
    event.target.classList.remove("text-white");
    event.target.classList.add("bg-white");
    event.target.classList.add("text-primary");
    event.target.classList.add("font-weight-bold");

    this.signUpHidden = true;
    this.btnName = "Đăng Nhập";
    this.btnSubmitArea.nativeElement.style.width = "100px";
}

public signUpArea(event: any) {
    this.getCaptcha();
    this.formType = 1;
    this.btnSignIn.nativeElement.classList.remove("bg-white");
    this.btnSignIn.nativeElement.classList.remove("text-primary");
    this.btnSignIn.nativeElement.classList.remove("font-weight-bold");
    this.btnSignIn.nativeElement.classList.add("bg");
    this.btnSignIn.nativeElement.classList.add("text-white");

    event.target.classList.remove("bg");
    event.target.classList.remove("text-white");
    event.target.classList.add("bg-white");
    event.target.classList.add("text-primary");
    event.target.classList.add("font-weight-bold");

    this.signUpHidden = false;
    this.btnName = "Đăng Ký";
    this.btnSubmitArea.nativeElement.style.width = "88px";
}
}
