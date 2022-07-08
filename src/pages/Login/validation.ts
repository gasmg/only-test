import * as yup from "yup";

const validationSchema = yup
	.object({
		login: yup
			.string()
			.email("Неправильный формат email")
			.required("Обязательное поле"),
		password: yup
			.string()
			.min(6, "Длина пароля должно состоять минимум из 6 символов")
			.max(15, "Длина пароля должно состоять максимум из 15 символов")
			.required("Обязательное поле"),
	})
	.required();

export default validationSchema;
