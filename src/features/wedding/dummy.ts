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
    guest: '(Cermati) Chris',
    template: 'default',
    cover: {
      url: '/images/example.jpg',
      position: '50% 50%',
      size: '200%',
    },
    section: {
      intro: [
        {
          label: 'section-intro-1',
          text: {
            body: dummyParagraph,
            icon: 'message',
          },
          image: {
            url: '/images/example.jpg',
            orientation: 'portrait',
            caption: {
              text: 'We are\nmarried!!',
              placement: 'top right',
            },
          },
        },
        {
          label: 'section-intro-2',
          text: {
            body: dummyList,
            icon: 'bride',
          },
          image: {
            url: '/images/example.jpg',
            orientation: 'portrait',
            caption: {
              text: 'Yossy',
              placement: 'bottom right',
            },
          },
        },
        {
          label: 'section-intro-3',
          text: {
            body: dummyList,
            icon: 'groom',
          },
          image: {
            url: '/images/example.jpg',
            orientation: 'portrait',
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
            body: dummyList,
            icon: 'message',
          },
          image: {
            url: '/images/example.jpg',
            orientation: 'landscape',
            placement: 'center',
            caption: {
              text: 'Saking\nJawa lur',
              placement: 'top left',
            },
          },
        },
        {
          label: 'section-date-2',
          text: {
            body: dummyList,
            icon: 'message',
          },
          image: null,
        },
      ],
      story: [
        {
          label: 'section-story-1',
          text: {
            body: dummyList,
            icon: 'message',
          },
          image: {
            url: '/images/example.jpg',
            orientation: 'landscape',
            placement: 'right',
            caption: {
              text: '6 tahun\nyang lalu',
              placement: 'top right',
            },
          },
        },
        {
          label: 'section-story-2',
          text: {
            body: dummyList,
            icon: 'message',
          },
          image: {
            url: '/images/example.jpg',
            orientation: 'landscape',
            placement: 'left',
            caption: {
              text: 'Otw lamaran\n kerumah calon',
              placement: 'bottom right',
            },
          },
        },
        {
          label: 'section-story-3',
          text: {
            body: dummyList,
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
            placement: 'right',
            caption: null,
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
// {
//   wid: 'e82b26e0-4088-4d80-bf7c-addefd92d60e',
//   uid: 'db131098-dfe4-4b86-9033-62902d59fecc',
//   name: 'claire-leon',
//   status: 'paid',
//   guest: 'Jill',
//   section: {
//     opening: [
//       {
//         name: 'intro',
//         text: {
//           body: 'lorem-ipsum intro',
//           icon: 'message',
//         },
//         image: {
//           orientation: 'portrait',
//           placement: 'left',
//           placement: 'before',
//           caption: null,
//           url: '/images/example.jpg',
//         },
//       },
//       {
//         name: 'bride',
//         text: {
//           body: 'lorem-ipsum bride',
//           icon: 'message',
//         },
//         image: {
//           orientation: 'portrait',
//           placement: 'left',
//           placement: 'before',
//           caption: null,
//           url: '/images/example.jpg',
//         },
//       },
//       {
//         name: 'groom',
//         text: {
//           body: 'lorem-ipsum groom',
//           icon: 'message',
//         },
//         image: {
//           orientation: 'portrait',
//           placement: 'left',
//           placement: 'before',
//           caption: null,
//           url: '/images/example.jpg',
//         },
//       },
//       {
//         name: 'outro',
//         text: null,
//         image: {
//           orientation: 'landscape',
//           placement: 'right',
//           placement: 'before',
//           caption: null,
//           url: '/images/example.jpg',
//         },
//       },
//     ],
//     date: [
//       {
//         name: 'ceremony',
//         text: {
//           body: 'lorem-ipsum ceremony',
//           icon: 'message',
//         },
//         image: {
//           orientation: 'landscape',
//           placement: 'left',
//           placement: 'before',
//           caption: null,
//           url: '/images/example.jpg',
//         },
//       },
//       {
//         name: 'reception',
//         text: {
//           body: 'lorem-ipsum reception',
//           icon: 'message',
//         },
//         image: null,
//       },
//     ],
//     story: [
//       {
//         name: 'story-1',
//         text: {
//           body: 'lorem-ipsum story-1',
//           icon: 'message',
//         },
//         image: {
//           orientation: 'landscape',
//           placement: 'right',
//           placement: 'before',
//           caption: null,
//           url: '/images/example.jpg',
//         },
//       },
//       {
//         name: 'story-2',
//         text: {
//           body: 'lorem-ipsum story-2',
//           icon: 'message',
//         },
//         image: {
//           orientation: 'landscape',
//           placement: 'left',
//           placement: 'before',
//           caption: null,
//           url: '/images/example.jpg',
//         },
//       },
//       {
//         name: 'story-3',
//         text: {
//           body: 'lorem-ipsum story-3',
//           icon: 'message',
//         },
//         image: {
//           orientation: 'landscape',
//           placement: 'right',
//           placement: 'after',
//           caption: null,
//           url: '/images/example.jpg',
//         },
//       },
//     ],
//   },
// },
