export const Card = ({ children, className }) => (
    <div className={`p-4 border rounded-lg shadow ${className}`}>
        {children}
    </div>
);

export const CardHeader = ({ children }) => <div className="font-bold text-lg">{children}</div>;
export const CardContent = ({ children }) => <div className="text-sm">{children}</div>;
export const CardTitle = ({ children }) => <h3 className="text-xl font-semibold">{children}</h3>;
