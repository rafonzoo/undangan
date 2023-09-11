import { type Infer } from '@app/types'
import {
  commentType,
  guestType,
  type invitationType,
} from '@wedding/state/schema'
import { check } from '@app/helpers/utils'
import { userAccountSchema } from '@account/store/schema'

export const dummyUser = check(userAccountSchema, {
  id: 'db131098-dfe4-4b86-9033-62902d59fecc',
  email: 'rafa@example.com',
  name: 'Rafa',
  wedding: ['531baf87-ce9d-4447-958d-6e771d68bca9'],
})

export const dummyGuest = check(guestType, 'Sibro')

export const dummyComment = check(commentType, {
  wid: '531baf87-ce9d-4447-958d-6e771d68bca9',
  uid: '09280f48-e4af-4dd2-bdfe-2e13b682260e',
  name: 'Alif Kahar',
  email: 'alif.kahar@email.com',
})

// prettier-ignore
export const dummyParagraph = (
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
  'sed do eiusmod tempor didunt utlabore et dolore magna aliqua. ' +
  'Ut enim ad minim veniam, quis nostrud exercit ation ullamco ' +
  'laboris nisi ut aliquip ex ea commo do consequat. ' +
  'Ut enim ad minim veniam, quis nostrud exercit ation ullamco ' +
  'exercit ation ullamcoexercit ation ullamco.'
)

// prettier-ignore
export const dummyList = (
  'Lorem ipsum dolor sit amet, consec tetur adipiscing elit, ' +
  'sed do eiusmod tempor didunt utlabore et dolore utlabore ' +
  'et dolore sed do eiusmod tempor didunt.'
)

export const dummyWeddings: Infer<typeof invitationType>[] = [
  {
    wid: '531baf87-ce9d-4447-958d-6e771d68bca9',
    uid: 'db131098-dfe4-4b86-9033-62902d59fecc',
    name: 'yossy-rafa',
    status: 'paid',
    guest: '(SMAN 38) Alif',
    template: 'default',
    hero: {
      url: '/images/example.jpg',
      position: '50% 50%',
      size: '200%',
    },
    section: {
      intro: [
        {
          label: 'section-intro-1',
          text: {
            body: 'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. (QS. Ar - rum 21)',
            icon: 'message',
          },
          image: {
            url: '/images/example.jpg',
            orientation: 'portrait',
            position: null,
            placement: null,
            size: null,
            caption: {
              text: 'We are\nmarried!!',
              placement: 'top right',
            },
          },
        },
        {
          label: 'section-intro-2',
          text: {
            body: 'Yossy Vitri Pangestuti, 25 tahun. Anak ke-3 dari Bpk. Surtiyarso dan Ibu Maria Margaretha. Hal yang kusuka dari Rafa adalah bla bla bla..',
            icon: 'bride',
          },
          image: {
            url: '/images/example.jpg',
            orientation: 'portrait',
            position: null,
            placement: null,
            size: null,
            caption: {
              text: 'Yossy',
              placement: 'bottom right',
            },
          },
        },
        {
          label: 'section-intro-3',
          text: {
            body: 'Rafa Rahmandika, 28 tahun. Anak pertama dari Bpk. Rayono dan Ibu Astuti. Hal yg kusuka dari Yossy adalah bla bla bla..',
            icon: 'groom',
          },
          image: {
            url: '/images/example.jpg',
            orientation: 'portrait',
            position: null,
            placement: null,
            size: null,
            caption: {
              text: 'Rafa',
              placement: 'top left',
            },
          },
        },
        {
          label: 'section-intro-5',
          text: null,
          image: {
            url: '/images/example.jpg',
            orientation: 'landscape',
            placement: 'right',
            position: '50% 70%',
            size: null,
            caption: {
              text: 'Momen saat\nkita akad =)',
              placement: 'bottom right',
            },
          },
        },
      ],
      date: [
        {
          label: 'section-date-1',
          text: {
            body: 'Akad: Sabtu, 23 September 2023 di Gedung Aula Gagak Hitam. Jalan Pesanggrahan Indah No. 11, RT. 10 / RW. 05, Pesanggrahan, Kecamatan Pesanggrahan, Kota Jakarta Selatan, 12320.',
            icon: 'message',
          },
          image: {
            url: '/images/example.jpg',
            orientation: 'landscape',
            position: null,
            placement: 'center',
            size: null,
            caption: {
              text: 'Saking\nJawa lur',
              placement: 'top left',
            },
          },
        },
        {
          label: 'section-date-2',
          text: {
            body: 'Resepsi: Sabtu, 07 Oktober di Graha SMKN 57 Jakarta. Jalan Taman Margasatwa Raya No. 38B, RT. 12 / RW. 05, Jati Padang, Pasar Minggu, Kota Jakarta Selatan, 12540.',
            icon: 'message',
          },
          image: null,
        },
      ],
      story: [
        {
          label: 'section-story-1',
          text: {
            body: 'Sudah kurang lebih 6 tahun kita saling kenal dan berteman. Pertama kali kita bertemu dari platform social media, tapi siapa sangka hubungan kami menjadi sangat serius ke tahap berikutnya.',
            icon: 'message',
          },
          image: {
            url: '/images/example.jpg',
            orientation: 'landscape',
            position: null,
            placement: 'right',
            size: null,
            caption: {
              text: '6 tahun\nyang lalu',
              placement: 'top right',
            },
          },
        },
        {
          label: 'section-story-2',
          text: {
            body: 'Akhirnya kami memutuskan untuk memutus pertemanan kami dan menuju ke jenjang lamaran sebelum ke pernikahan. Kami menggelar prosesi lamaran pada Sabtu, 13 Mei 2023.',
            icon: 'message',
          },
          image: {
            url: '/images/example.jpg',
            orientation: 'landscape',
            placement: 'left',
            size: null,
            position: null,
            caption: {
              text: 'Otw lamaran\n kerumah calon',
              placement: 'bottom right',
            },
          },
        },
        {
          label: 'section-story-3',
          text: {
            body: 'Dengan tekat yang kuat dan keinginan yang tinggi. Kami sepakat untuk melangsungkan pernikahan sebagai tanda cinta kita yang tidak akan hilang sampai selamanya. Aaaaanjay',
            icon: 'message',
          },
          image: null,
        },
        {
          label: 'section-story-4',
          text: null,
          image: {
            url: '/images/example.jpg',
            orientation: 'landscape',
            position: null,
            placement: 'right',
            caption: null,
            size: null,
          },
        },
      ],
      comment: [
        {
          label: 'section-comment-1',
          text: null,
          image: {
            url: '/images/example.jpg',
            orientation: 'portrait',
            position: null,
            placement: null,
            size: null,
            caption: {
              text: 'Mohon doa\nrestu yaa',
              placement: 'top left',
            },
          },
        },
      ],
    },
  },
]
