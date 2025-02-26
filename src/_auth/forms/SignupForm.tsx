import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
//FORM
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SignupValidationFormSchema } from "../../lib/validation/index";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
//COMPONENTS
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
//IMG
import logo from "/assets/images/logo.svg";
//custom FN
// import { createNewUserAccount } from "@/lib/appwrite/api"; - используется сначала в танстаке
import {
  useCreateUserAccountMutation,
  useSignInAccount,
} from "@/lib/react-query/queriesAndMutations";

const SignupForm = () => {
  // для проверки
  // setInterval(() => toast("HELLO"), 1000);

  const { mutateAsync: createNewUserAccount, isLoading: isCreatingUser } =
    useCreateUserAccountMutation();

  const { mutateAsync: signInAccount, isLoading: isSigningin } =
    useSignInAccount();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidationFormSchema>>({
    resolver: zodResolver(SignupValidationFormSchema),
    //1. Меняем содержимое формы на основании SignupValidationFormSchema отдельного файла
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidationFormSchema>) {
    // создаем и проверяем юзера
    const newUser = await createNewUserAccount(values);
    if (!newUser) {
      return toast("Uh oh! SIGN UP failed");
    }

    //оздаем и проверяем сессию
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });
    if (!session) {
      return toast("Uh oh! SIGN IN failed");
    }
  }

  return (
    <Form {...form}>
      <div className="flex flex-col items-center w-420 gap-5">
        <img src={logo} alt="logo" />
        <h2 className="h2-bold">Створи свій аккаунт</h2>
        <p className="text-gray-500">Щоб користуватися Isavet введи деталі </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ім'я</FormLabel>

                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ім'я користувача</FormLabel>

                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>

                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>

                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="shad-button_primary w-full" type="submit">
            {isCreatingUser ? "Loading..." : "Sign up"}
          </Button>
        </form>

        <p className="text-gray-500">
          Вже є аккаунт?{" "}
          <Link className="text-primary-500" to="/sign-in">
            Увійдіть
          </Link>{" "}
        </p>
      </div>
    </Form>
  );
};

export default SignupForm;
