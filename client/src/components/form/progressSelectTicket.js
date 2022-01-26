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

export default function ProgressSelectTicket({ props }) {
	const {
		setFormData,
		formData,
		selectedTicketId,
		selectedMyTicket,
		setDefaultStatusValue,
	} = props;
	const options = [
		{ label: "OPEN", value: "open" },
		{ label: "PROGRESS", value: "progress" },
		{ label: "RESOLVED", value: "resolved" },
	];

	const [isLoading, setIsLoading] = useState(true);
	const handleOnChange = (e) => {
		setFormData({ ...formData, status: e });
	};

	useEffect(() => {
		if (selectedTicketId) {
			setDefaultStatusValue(
				options.find((option) => option.value === selectedMyTicket.status)
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
			<FormLabel>Progress</FormLabel>
			{!isLoading && (
				<Select
					name="status"
					options={options}
					styles={customStyles}
					onChange={handleOnChange}
					value={formData.status}
				/>
			)}
		</>
	);
}
