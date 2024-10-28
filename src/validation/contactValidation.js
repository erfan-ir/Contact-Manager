import * as Yup from "yup";
export const contactSchema = Yup.object().shape({
  fullname: Yup.string().required("نام و نام خانوادگی الزامی می باشد"),
  photo: Yup.string()
    .required("تصویر مخاطب الزامی می باشد")
    .url("آدرس معتبر نیست"),
  mobile: Yup.number()
    .positive("عدد مثبت وارد کنید")
    .integer("اعشار نمیتوان وارد کرد")
    .required("شماره موبایل الزامی می باشد"),
  email: Yup.string()
    .email("آدرس ایمیل معتبر نیست")
    .required("آدرس ایمیل الزامی می باشد"),
  job: Yup.string().nullable(),
  group: Yup.string().required("انتخاب گروه الزامی می باشد"),
});
