// TextInput.js
import React from "react"

export default function TextInput({ label, register, name, errors }) {
	return (
		<div className='flex flex-col gap-1'>
			<label htmlFor={name}>{label}</label>
			<input
				type='text'
				className='border text-white border-zinc-800 bg-zinc-900 shadow-sm rounded h-10 px-3'
				{...register(name)}
			/>
			{errors[name] && (
				<span className='text-red-500 text-xs'>{errors[name].message}</span>
			)}
		</div>
	)
}
