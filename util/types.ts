export type User = {
    name: string,
    real_name: string,
    display_name: string,
    language: 'en_US',
    layout: null,
    session: string,
    logged_in: boolean,
}
export type Session = {
    key: string,
    name: string,
    comment: string,
}
