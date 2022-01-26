import { FormLabel } from "@mui/material";
import { useEffect, useState } from "react";
import Select from "react-select";

const customStyles = {
	menu: (provided, state) => ({
		...provided,
		fontFamily: "Roboto",
	}),
	menuList: (provided, state) => ({
		...provided,
		height: "120px",
		padding: "5px",
	}),

	input: (provided, state) => ({
		...provided,
		fontFamily: "Roboto",
	}),

	placeholder: (provided, state) => ({
		...provided,

		fontFamily: "Roboto",
	}),
	singleValue: (provided, state) => ({
		...provided,

		fontFamily: "Roboto",
	}),
};

export default function PrioritySelectTicket({ props }) {
	const {
		setFormData,
		formData,
		selectedMyTicket,
		selectedTicketId,
		setDefaultPriorityValue,
	} = props;
	const options = [
		{ label: "LOW", value: "low" },
		{ label: "MED", value: "medium" },
		{ label: "HIGH", value: "high" },
	];
	const [isLoading, setIsLoading] = useState(true);

	const handleOnChange = (e) => {
		setFormData({ ...formData, priority: e });
	};

	useEffect(() => {
		if (selectedTicketId) {
			setDefaultPriorityValue(
				options.find((option) => option.value === selectedMyTicket.priority)
			);

			setIsLoading(false);
		}

		if (!selectedTicketId) {
			setIsLoading(false);
		}
		// eslint-disable-next-line
	}, [selectedTicketId !== null]);

	return (
		<>
			<FormLabel>Priority</FormLabel>
			{isLoading ? (
				<></>
			) : (
				//
				<Select
					name="priority"
					options={options}
					styles={customStyles}
					onChange={handleOnChange}
					value={formData.priority}
				/>
			)}
		</>
	);
}
