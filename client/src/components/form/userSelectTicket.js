import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

import Select from "react-select";

const customStyles = {
	menu: (provided, state) => ({
		...provided,

		fontFamily: "Roboto",
	}),
	menuList: (provided, state) => ({
		...provided,
		height: "100%",
		maxHeight: "120px",
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
	multiValue: (provided, state) => ({
		...provided,

		fontFamily: "Roboto",
	}),
};

export default function UserSelectTicket({ props }) {
	const {
		allUsers,
		setFormData,
		formData,
		selectedProject,
		selectedTicketId,
		setDefaultDevelopersValue,
	} = props;
	const [options, setOptions] = useState(null);

	const [isLoading, setIsLoading] = useState(true);
	const { data } = allUsers;

	const handleOnChange = (e) => {
		setFormData({ ...formData, developers: e });
	};

	useEffect(() => {
		setOptions(
			data?.users
				.map((user) => {
					return { value: user._id, label: user.email };
				})
				.filter((user) => selectedProject.developers.includes(user.value))
		);

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		//for update
		if (selectedTicketId) {
			setDefaultDevelopersValue(
				data?.users
					.map((user) => {
						return { value: user._id, label: user.email };
					})
					.filter((user) => {
						return selectedProject.developers.includes(user.value);
					})
			);

			setFormData({
				...formData,
				developers: data?.users
					.map((user) => {
						return { value: user._id, label: user.email };
					})
					.filter((user) => {
						return selectedProject.developers.includes(user.value);
					}),
			});
			setIsLoading(false);
		}
		if (!selectedTicketId) {
			setIsLoading(false);
		}
		// eslint-disable-next-line
	}, [selectedTicketId !== null]);

	return isLoading ? (
		<Typography>Loading...</Typography>
	) : (
		<>
			<Select
				name="developer"
				options={options}
				styles={customStyles}
				placeholder={"Please Select Developer"}
				isSearchable
				isMulti
				onChange={handleOnChange}
				value={formData.developers}
			/>
		</>
	);
}
