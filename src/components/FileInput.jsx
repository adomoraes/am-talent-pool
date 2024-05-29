// FileInput.js
import React from "react"

export default function FileInput({ label, register, name, accept, errors }) {
	return (
		<div className='flex flex-col gap-1'>
			<label htmlFor={name}>{label}</label>
			<input type='file' accept={accept} {...register(name)} />
			{errors[name] && (
				<span className='text-red-500 text-xs'>{errors[name].message}</span>
			)}
		</div>
	)
}
