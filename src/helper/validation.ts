export const validateForm = (formData: any) => { 
    if (!formData) {
        return {};
    }
    let errors: { [key: string]: string } = {};
    Object.keys(formData).forEach((key) => {
        if (formData[key] === "") {
            errors[key] = "This field is required";
        }
    });
    return errors;
}