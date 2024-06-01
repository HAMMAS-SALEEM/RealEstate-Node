export const allAccess = () => {
  res.status(200).send('Public Content')
}

export const userAccess = () => {
  res.status(200).send('User Content')
}

export default {
    allAccess,
    userAccess,
}