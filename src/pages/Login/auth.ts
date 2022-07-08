import { IFormInput } from "./LoginForm";
import { users } from "./users";

export const login = (formData: IFormInput) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const currentUser = users.find((user) => {
				return (
					user.login === formData.login && user.password === formData.password
				);
			});

			if (currentUser) {
				resolve(null);
			} else {
				reject(new Error(`Пользователя ${formData.login} не существует`));
			}
		}, 3500 * Math.random());
	});
};
