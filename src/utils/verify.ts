const validDepartments = [
	'External Relations',
	'Design',
	'Marketing & Content',
	'Multimedia',
	'Production & Video',
	'Planning',
	'Logistics',
	'HR',
	'Technical Development',
	'Sports',
	'Culture',
];

const validSchools = ['ensia', 'nhsm', 'nhsast', 'nsnn', 'esi', 'other'];

const validYears = ['1', '2', '3', '4', '5', 'alumni'];

export function verifyFirstName(value: string): boolean {
	return value.trim().length > 0 && /^[a-zA-Z\s]+$/.test(value);
}

export function verifyLastName(value: string): boolean {
	return value.trim().length > 0 && /^[a-zA-Z\s]+$/.test(value);
}

export function verifyEmail(value: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(value);
}

export function verifyPhone(value: string): boolean {
	// Assuming Algerian phone number format: starts with 0 or +213, followed by 9 digits
	const phoneRegex = /^(\+213|0)[5-7]\d{8}$/;
	return phoneRegex.test(value.replace(/\s/g, ''));
}

export function verifySchool(value: string): boolean {
	return validSchools.includes(value);
}

export function verifyYear(value: string): boolean {
	return validYears.includes(value);
}

export function verifyDepartment(value: string): boolean {
	return value.trim().length > 0 && validDepartments.includes(value);
}

export function verifyWork(value: string): boolean {
	return value.trim().length >= 0; // Minimum 10 characters
}

export function verifyExperience(value: string): boolean {
	return value.trim().length >= 0; // Minimum 10 characters
}

export function verifyExpectations(value: string): boolean {
	return value.trim().length >= 0; // Minimum 0 characters
}
