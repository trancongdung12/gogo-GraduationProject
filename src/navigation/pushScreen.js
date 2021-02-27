import { Navigation } from 'react-native-navigation';
import Icons from 'react-native-vector-icons/FontAwesome';
import colors from '../themes/Colors';
export const pushScreen = (componentId, screenApp, passProps, title, visible, left, right) => {
  Promise.all([Icons.getImageSource(left, 25), Icons.getImageSource(right, 25)]).then(
    ([leftImage, rightImage]) => {
      Navigation.push(componentId, {
        component: {
          name: screenApp,
          passProps: {
            data: passProps,
            title: title,
          },
          options: {
            topBar: {
              visible: visible,
              title: {
                text: title,
              },
              leftButtons: [
                {
                  id: left,
                  icon: leftImage,
                  fontSize: 10,
                  color: '#555',
                },
              ],
              rightButtons: [
                {
                  id: right,
                  icon: rightImage,
                  fontSize: 10,
                  color: '#555',
                },
              ],
            },
          },
        },
      });
    },
  );
};
export const loginScreen = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Login',
              options: {
                topBar: {
                  visible: false,
                },
              },
            },
          },
        ],
      },
    },
  });
  Navigation.setDefaultOptions({
    statusBar: {
      backgroundColor: colors.primary,
    },
  });
};

export const homeScreen = () => {
  Promise.all([
    Icons.getImageSource('home', 30),
    Icons.getImageSource('clipboard', 30),
    Icons.getImageSource('plus-circle', 30),
    Icons.getImageSource('bell', 30),
    Icons.getImageSource('user-circle', 30),
  ]).then(([home, orderHistory, order, notifications, user]) => {
    Navigation.setRoot({
      root: {
        sideMenu: {
          center: {
            bottomTabs: {
              children: [
                {
                  stack: {
                    children: [
                      {
                        component: {
                          name: 'Home',
                          options: {
                            topBar: {
                              visible: false,
                            },
                            bottomTab: {
                              icon: home,
                            },
                          },
                        },
                      },
                    ],
                  },
                },
                {
                  stack: {
                    children: [
                      {
                        component: {
                          name: 'Status',
                          options: {
                            topBar: {
                              visible: false,
                            },
                            visible: false,
                            bottomTab: {
                              icon: orderHistory,
                            },
                          },
                        },
                      },
                    ],
                  },
                },
                {
                  stack: {
                    children: [
                      {
                        component: {
                          name: 'Order',
                          options: {
                            topBar: {
                              visible: false,
                            },
                            bottomTab: {
                              icon: order,
                            },
                          },
                        },
                      },
                    ],
                  },
                },
                {
                  stack: {
                    children: [
                      {
                        component: {
                          name: 'Notification',
                          options: {
                            topBar: {
                              visible: false,
                            },
                            bottomTab: {
                              icon: notifications,
                            },
                          },
                        },
                      },
                    ],
                  },
                },
                {
                  stack: {
                    children: [
                      {
                        component: {
                          name: 'User',
                          options: {
                            topBar: {
                              visible: false,
                            },
                            bottomTab: {
                              icon: user,
                            },
                          },
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
      },
    });
    Navigation.setDefaultOptions({
      statusBar: {
        backgroundColor: colors.primary,
      },
      bottomTab: {
        backgroundColor: colors.primary,
        selectedIconColor: colors.primary,
      },
    });
  });
};

export const introScreen = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Intro',
              options: {
                topBar: {
                  visible: false,
                },
              },
            },
          },
        ],
      },
    },
  });
};