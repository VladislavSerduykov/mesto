const cohortId = 'cohort-64'
const token = '6cab5de8-5b45-4a25-b2f6-6cf575d48f88'

export const config = {
    baseUrl: `https://mesto.nomoreparties.co/v1/${cohortId}`,
    headers: {
        authorization: token,
        'Content-Type': 'application/json'
    }
}

