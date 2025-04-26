"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { sendContactMessage } from "@/app/actions";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Loader2, Send } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  subject: z
    .string()
    .min(5, { message: "Assunto deve ter pelo menos 5 caracteres" }),
  message: z
    .string()
    .min(10, { message: "Mensagem deve ter pelo menos 10 caracteres" }),
});

type FormValues = z.infer<typeof formSchema>;

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-gradient-to-r from-red-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" /> Enviar Mensagem
        </>
      )}
    </Button>
  );
}

export function ContactForm() {
  const [formSuccess, setFormSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data: FormValues) {
    try {
      await sendContactMessage(data);
      form.reset();
      setFormSuccess(true);
      toast({
        title: "Mensagem enviada!",
        description: "Agradecemos seu contato. Retornaremos em breve.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Erro ao enviar mensagem",
        description:
          "Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-zinc-800">
      {formSuccess ? (
        <div className="flex flex-col items-center justify-center space-y-4 py-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-600 dark:text-green-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold">Mensagem Enviada!</h3>
          <p className="text-muted-foreground">
            Agradecemos seu contato. Retornaremos em breve.
          </p>
          <Button
            variant="outline"
            onClick={() => setFormSuccess(false)}
            className="mt-4"
          >
            Enviar outra mensagem
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome" {...field} />
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
                    <Input
                      placeholder="seu.email@exemplo.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assunto</FormLabel>
                  <FormControl>
                    <Input placeholder="Assunto da mensagem" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensagem</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Sua mensagem..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton />
          </form>
        </Form>
      )}
    </div>
  );
}
