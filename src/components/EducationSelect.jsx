// EducationSelect.js
import React from "react"

export default function EducationSelect({ register, errors }) {
	return (
		<div>
			<label htmlFor='education'>Escolha sua education:</label>
			<select
				id='education'
				{...register("education", { required: true })}
				className='w-full border text-white border-zinc-800 bg-zinc-900 shadow-sm rounded h-10 px-3'>
				<option value=''>Selecione...</option>
				<option value='fundamental'>Ensino Fundamental</option>
				<option value='medio'>Ensino Médio</option>
				<option value='superior'>Ensino Superior</option>
				<option value='posgraduacao'>Pós-Graduação</option>
				<option value='mestrado'>Mestrado</option>
				<option value='doutorado'>Doutorado</option>
			</select>
			{errors.education && (
				<span className='text-red-500 text-xs'>{errors.education.message}</span>
			)}
		</div>
	)
}
