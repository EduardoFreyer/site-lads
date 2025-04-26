"use server"

import { z } from "zod"

const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export async function sendContactMessage(formData: ContactFormData) {
  // Validar os dados do formulário
  const validatedFields = contactFormSchema.safeParse(formData)

  if (!validatedFields.success) {
    throw new Error("Formulário inválido")
  }

  // Simular um atraso de processamento
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Em um ambiente real, aqui você enviaria o email usando um serviço como:
  // - SendGrid
  // - Resend
  // - Amazon SES
  // - Ou salvaria em um banco de dados

  // Exemplo de log dos dados (apenas para demonstração)
  console.log("Mensagem recebida:", {
    nome: formData.name,
    email: formData.email,
    assunto: formData.subject,
    mensagem: formData.message,
    dataHora: new Date().toISOString(),
  })

  // Retornar sucesso
  return { success: true }
}
