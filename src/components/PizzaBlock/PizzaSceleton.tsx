import { FC } from 'react';
import ContentLoader from 'react-content-loader';

export const PizzaSceleton: FC<{className?: string}> = (props) => (
    <ContentLoader
        speed={5}
        width={280}
        height={465}
        viewBox="0 0 280 465"
        backgroundColor="#ecebeb"
        foregroundColor="#ecebeb"
        {...props}>
        <circle cx="125" cy="125" r="120" />
        <rect x="0" y="270" rx="5" ry="5" width="280" height="30" />
        <rect x="0" y="428" rx="10" ry="10" width="90" height="30" />
        <rect x="0" y="316" rx="5" ry="5" width="280" height="85" />
        <rect x="130" y="420" rx="25" ry="25" width="150" height="45" />
    </ContentLoader>
);
