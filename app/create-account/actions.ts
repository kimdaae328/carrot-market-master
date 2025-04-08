"use server";
import { z } from "zod";

const formSchema = z.object({
    userName:z.string({
        invalid_type_error: "Username must be a string!", //string이 아닐때
        required_error: "Where is my username???", //내용 안적었을때
    }).min(5, "너무 짧아요").max(10, "너무 길어요"),
    email:z.string().email(),
    password:z.string().min(10),
    confirmPassword:z.string().min(10),
});

export async function createAccount(prevState:any, formData:FormData){
    const data = {
        userName:formData.get("userName"),
        email:formData.get("email"),
        password:formData.get("password"),
        confirmPassword:formData.get("confirmPassword"),
    };
    const result = formSchema.safeParse(data);
    if(!result.success){
        return result.error.flatten();
    }
}