"use client";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
	// fetch placeholder data with react query
	const { data, isLoading } = useQuery({
		queryKey: ["query"],
		queryFn: async () => {
			const res = await fetch(
				"https://jsonplaceholder.typicode.com/posts",
			);
			return res.json();
		},
	});

	console.log(data);

	return (
		<section className="text-center">
			<h1 className="text-4xl font-bold">
				Blank Page : Header Coming Soon 🤞
			</h1>
		</section>
	);
}
