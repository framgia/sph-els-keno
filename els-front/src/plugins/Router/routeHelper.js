export const pathType = ({ pathname }) => {
    return pathname.includes('admin') ? 'admin' : 'user'
}