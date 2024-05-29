// PhoneInput.js
import React, { useState } from "react"

export default function PhoneInput({ register, errors }) {
	const [phoneNumber, setPhoneNumber] = useState("")

	const handleChange = (e) => {
		const formattedPhoneNumber = e.target.value.replace(/\D/g, "")
		let formattedValue = ""
		if (formattedPhoneNumber.length <= 2) {
			formattedValue = `(${formattedPhoneNumber}`
		} else if (formattedPhoneNumber.length <= 7) {
			formattedValue = `(${formattedPhoneNumber.slice(
				0,
				2
			)}) ${formattedPhoneNumber.slice(2)}`
		} else {
			formattedValue = `(${formattedPhoneNumber.slice(
				0,
				2
			)}) ${formattedPhoneNumber.slice(2, 7)}-${formattedPhoneNumber.slice(
				7,
				11
			)}`
		}
		setPhoneNumber(formattedValue)
	}

	return (
		<>
			<label htmlFor='phonenumber'>Telefone</label>
			<input
				type='text'
				{...register("phonenumber", { required: true })}
				value={phoneNumber}
				onChange={handleChange}
				placeholder='(99)9999-9999'
				maxLength={15}
				className='border text-white border-zinc-800 bg-zinc-900 shadow-sm rounded h-10 px-3'
			/>
			{errors.phonenumber && (
				<span className='text-red-500 text-xs'>
					{errors.phonenumber.message}
				</span>
			)}
		</>
	)
}
