import React, {FormEvent} from 'react';
import styles from './SubmitForm.module.scss';

type SubmitFormProps = {
    children: React.ReactNode
    layoutClass?: string
    useSubmitForm: () => {
        submitHandler: (event: FormEvent<HTMLFormElement>) => void,
        notAllowedToChange: boolean
    }
}
const SubmitForm: React.FC<SubmitFormProps> = ({ children, useSubmitForm, layoutClass = styles.layout}) => {
	const {notAllowedToChange, submitHandler} = useSubmitForm();
	return(<form onSubmit={submitHandler}>
		<fieldset disabled={notAllowedToChange}>
			<div className={layoutClass}>
				{children}
				<input type={'submit'} className={styles.button}/>
			</div>
		</fieldset>
	</form>);
};
export default SubmitForm;