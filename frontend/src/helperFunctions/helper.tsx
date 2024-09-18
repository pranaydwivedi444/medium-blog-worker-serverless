export function DateModifier(date:string) {
    return new Date(date).toLocaleDateString("en-GB");
}