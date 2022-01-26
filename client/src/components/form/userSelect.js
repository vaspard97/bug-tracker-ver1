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
	multiValue: (provided, state) => ({
		...provided,

		fontFamily: "Roboto",
	}),
};

export default function UserSelect({ props }) {
	const { allUsers, setFormData, formData, projectSelector, selectedId } =
		props;
	const [options, setOptions] = useState(null);
	const [defaultValues, setDefaultValues] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const { data } = allUsers;
	const handleOnChange = (e) => {
		setFormData({ ...formData, developers: e });
	};

	useEffect(() => {
		setOptions(
			data?.users.map((user) => {
				return { value: user._id, label: user.email };
			})
		);

		if (selectedId) {
			setDefaultValues(
				data?.users
					.map((user) => {
						return { value: user._id, label: user.email };
					})
					.filter((user) => {
						return projectSelector.developers.includes(user.value);
					})
			);
			setIsLoading(false);
			setFormData({
				...formData,
				developers: data?.users
					.map((user) => {
						return { value: user._id, label: user.email };
					})
					.filter((user) => {
						return projectSelector.developers.includes(user.value);
					}),
			});
		}

		if (!selectedId) {
			setIsLoading(false);
			setDefaultValues(null);
		}
		// eslint-disable-next-line
	}, []);

	return isLoading ? (
		<Typography>Loading...</Typography>
	) : (
		<Select
			name="developer"
			options={options}
			styles={customStyles}
			placeholder={"Please Select Developer"}
			isSearchable
			isMulti
			onChange={handleOnChange}
			defaultValue={defaultValues}
		/>
	);
}
