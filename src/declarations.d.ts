declare module '*.module.css' {
    const classes: { [key: string]: string | number};
    export default classes;
}

declare module 'uniqid' {
    export default function uniqid(prefix?: string, suffix?: string): string;
}
