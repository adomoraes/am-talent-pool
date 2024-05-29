import "./styles/global.css"
import { useState, useEffect } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { supabase } from "./lib/supabase"

import TextInput from "./components/TextInput"
import FileInput from "./components/FileInput"
import EmailInput from "./components/EmailInput"
import PhoneInput from "./components/PhoneInput"
import TextareaInput from "./components/TextareaInput"
import EducationSelect from "./components/EducationSelect"

const isValidFileExtension = (file, allowedExtensions) => {
	if (!file) return false
	const extension = file.name.split(".").pop().toLowerCase()
	return allowedExtensions.includes(extension)
}

const createUserFormSchema = z.object({
	avatar: z
		.optional(z.instanceof(FileList))
		.transform((list) => (list ? list.item(0) : null))
		.refine((file) => file !== null, "Avatar é obrigatório.")
		.refine(
			(file) => file && file.size < 1 * 1024 * 1024,
			"Arquivo maior do que o permitido."
		)
		.refine(
			(file) => isValidFileExtension(file, ["doc", "docx", "pdf"]),
			"Apenas arquivos .doc, .docx ou .pdf são permitidos."
		),
	name: z
		.string()
		.min(1, "Campo obrigatório")
		.transform((name) => {
			return name
				.trim()
				.split(" ")
				.map((word) => {
					return word[0].toLocaleUpperCase().concat(word.substring(1))
				})
				.join(" ")
		}),
	email: z.string().min(1, "Email obrigatório!").email("Formato inválido!"),
	phonenumber: z.string().min(15, "Telefone inválido!"),
	desiredjob: z.string().min(1, "Campo obrigatório!"),
	education: z
		.string()
		.min(1, "Campo obrigatório!")
		.refine((value) => value !== "", "Campo obrigatório!"),
	textareafield: z.string(),
})

export default function App() {
	const [output, setOutput] = useState("")
	const [currentDateTime, setCurrentDateTime] = useState("")

	useEffect(() => {
		const getCurrentDateTime = () => {
			const now = new Date()
			const year = now.getFullYear()
			const month = String(now.getMonth() + 1).padStart(2, "0")
			const day = String(now.getDate()).padStart(2, "0")
			const hours = String(now.getHours()).padStart(2, "0")
			const minutes = String(now.getMinutes()).padStart(2, "0")
			const seconds = String(now.getSeconds()).padStart(2, "0")
			return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
		}
		setCurrentDateTime(getCurrentDateTime())
	}, [])

	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm({
		resolver: zodResolver(createUserFormSchema),
	})

	async function createUser(data) {
		const fileName = data.avatar.name || ""
		await supabase.storage.from("am-talent-pool").upload(fileName, data.avatar)
		data.avatarfilename = fileName
		data.currentdatetime = currentDateTime

		const { data: candidate, error } = await supabase
			.from("candidates")
			.insert([data])

		if (error) {
			console.error("Erro ao inserir dados:", error.message)
			return
		}

		// Envio do e-mail
		// const { data: emailData, error: emailError } = await supabase
		// 	.from("supabase_functions.send_email")
		// 	.insert([
		// 		{
		// 			to: data.email,
		// 			subject: "Confirmação de Cadastro",
		// 			html: `<p>Olá ${data.name}, seu currículo foi cadastrado com sucesso!</p>`,
		// 		},
		// 	])

		// if (emailError) {
		// 	console.error("Erro ao enviar e-mail:", emailError.message)
		// 	return
		// }
	}

	return (
		<main className='text-zinc-300 flex flex-col gap-10 items-center justify-center'>
			<h1 className='mt-4 text-4xl font-black	text-white'>AM Talent Pool</h1>
			<form
				onSubmit={handleSubmit(createUser)}
				className='flex flex-col gap-4 w-full max-w-xs'>
				<input type='hidden' name='currentDateTime' value={currentDateTime} />
				<TextInput
					label='Nome'
					register={register}
					name='name'
					errors={errors}
				/>
				<EmailInput
					label='E-mail'
					register={register}
					name='email'
					errors={errors}
				/>
				<PhoneInput
					label='Telefone'
					register={register}
					name='phonenumber'
					errors={errors}
				/>
				<TextInput
					label='Cargo Desejado'
					register={register}
					name='desiredjob'
					errors={errors}
				/>
				<EducationSelect
					label='Escolha sua educação'
					register={register}
					name='education'
					errors={errors}
				/>

				<TextareaInput
					label='Observações'
					register={register}
					name='textareafield'
					maxLength={101}
					errors={errors}
				/>
				<FileInput
					label='Anexar CV'
					register={register}
					name='avatar'
					accept='.doc, .docx, .pdf'
					errors={errors}
				/>
				<button
					type='submit'
					className='bg-emerald-500 font-semibold text-white h-10 rounded hover:bg-emerald-600'>
					Salvar
				</button>
			</form>

			<pre>{output}</pre>
		</main>
	)
}
