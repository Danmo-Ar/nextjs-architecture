import { ElementType, PropsWithChildren, ReactNode } from "react";

type Provider = [ElementType, Record<string, unknown>][];
type ProviderTree = (props: { children: ReactNode }) => ReactNode;

export const buildProvidersTree = (providers: Provider): ProviderTree => {
	const InitialComponent = ({ children }: { children: ReactNode }) => (
		<>{children}</>
	);
	return providers.reduce((AccComponents, [Provider, props = {}]) => {
		const ProviderTree = ({ children }: PropsWithChildren) => {
			return (
				<AccComponents>
					<Provider {...props}>{children} </Provider>
				</AccComponents>
			);
		};
		return ProviderTree;
	}, InitialComponent);
};
