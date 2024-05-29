// TextareaInput.js
import React from "react"

export default function TextareaInput({
	label,
	register,
	name,
	maxLength,
	errors,
}) {
	return (
		<div className='flex flex-col gap-1'>
			<label htmlFor={name}>{label}</label>
			<textarea
				maxLength={maxLength}
				className='h-28 border text-white border-zinc-800 bg-zinc-900 shadow-sm rounded px-3'
				{...register(name)}
			/>
		</div>
	)
}
