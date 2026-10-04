'use server';

import { cookies } from "next/headers";
import type { RegistrationPayload } from "@/types/registration";

const sheet = process.env.NEXT_PUBLIC_SHEET_URL;

export async function postData(data: RegistrationPayload) {
	if (!sheet) {
		throw new Error("Registration endpoint is not configured");
	}

	const res = await fetch(sheet, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			...data.mainData,
			...data.departmentData,
			...data.motivationData,
		}),
	});

	if (!res.ok) {
		throw new Error('Failed to submit form');
	}

	const jsonResponse = await res.json();
	if (jsonResponse.result !== "success") {
		throw new Error("Registration was not accepted");
	}

	const cookieStore = await cookies();
	cookieStore.set("registered", "true", {
		httpOnly: true,
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
		path: "/",
		maxAge: 31536000,
	});

	return jsonResponse;
}

export async function getRegistrationStatus() {
	const cookieStore = await cookies();
	return cookieStore.get("registered")?.value === "true";
}