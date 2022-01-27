import { Alert } from "@mui/material";
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
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (selectedId) {
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
			setIsLoading(false);
		}

		if (!selectedId) {
			setIsLoading(false);
		}
		// eslint-disable-next-line
	}, [selectedId !== null]);

	return isLoading ? (
		<Alert severity="info">Fetching User Data</Alert>
	) : (
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
	);
}
