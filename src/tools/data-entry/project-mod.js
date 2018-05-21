import mongoose from 'mongoose'
import Project from '../../models/project'
import User from '../../models/user'

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/jams')

const modifyTrades = async () => {
  const projects = await Project.find({})
  projects.map(async (project) => {
    project.subtrades = []
    project.trades.map(async (trade) => {
      project.subtrades.push({
        type: 'trades',
        value: {
          trade: trade.trade,
          toggled: trade.toggled,
          subtrades : (() => {
            if (trade.children.length > 0) {
              return trade.children.map((childTrade) => {
                return {
                  type: 'trades',
                  value: {
                    trade: childTrade.trade,
                    toggled: childTrade.toggled
                  }
                }
              })
            }

            return []

          })()
        }
      })

      await project.save()
    })
  })

}

const PERSONNEL_POSITION = {
  'Superintendent': 'superIntendent',
  'Project Manager': 'projectManager',
  'Project Coordinator': 'projectCoordinator',
  'Foreman': 'foreman',
  'HSE Coordinator': 'hse',
  'Other' : 'other'
}

const modifyUsers = async () => {
  const projects = await Project.find({})
  await projects.map(async (project) => {
    await project.users.map(async (user, key) => {
      const _user = await User.findById(user.user)
      project.personnels.push({
        type: PERSONNEL_POSITION[_user.position],
        value: {
          user: _user._id,
          toggled: user.toggled
        }
      })

      if (key === project.users.length - 1) {
        project.save()
      }
    })
  })

}

const modifyUsers2 = async () => {
  User.find({}, (err, users) => {
    if (err) console.log(err)

    users.map(async (user) => {
      user.projectPermissions.map(async (pm) => {
        const project = await Project.findById(pm.value.project)

        if (project) {
          let exists = false
          project.personnels.map(personnel => {

            if (personnel.value.user.toString() === user._id.toString()) {
              exists = true
            }
          })

          if (!exists) {
            project.personnels.push({
              type: PERSONNEL_POSITION[user.position],
              value: {
                user: user._id,
                toggled: false
              }
            })
            await project.save()
          }
        }

      })
    })
  })

  // await projects.map(async (project) => {
  //   await project.users.map(async (user, key) => {
  //     const _user = await User.findById(user.user)
  //     console.log(_user)
  //     project.personnels.push({
  //       type: PERSONNEL_POSITION[_user.position],
  //       value: {
  //         user: _user._id,
  //         toggled: user.toggled
  //       }
  //     })

  //     if (key === project.users.length - 1) {
  //       project.save()
  //     }
  //   })
  // })
}

// Project.find({}, (err, projects) => {
//   if (err) {
//     console.log(err)
//   }
//   projects.map((project) => {
//     project.personnels = []
//     project.save()
//   })
// })

// User.find({}, async (err, users) => {
//   if (err) {
//     console.log(err)
//   }

//   for (let i = 0; i < users.length; i++) {
//     if (!PERSONNEL_POSITION[users[i].position]) {
//       users[i].position = 'Other'
//       await users[i].save()
//     }
//   }

// })

modifyUsers2()