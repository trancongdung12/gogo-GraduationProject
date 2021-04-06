import { Navigation } from 'react-native-navigation';
import Icons from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import colors from '../themes/Colors';

export const popScreen = (componentId) => {
  Navigation.mergeOptions(componentId, {
    bottomTabs: {
      visible: true,
    },
  });
  Navigation.pop(componentId);
};
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
            bottomTabs: {
              visible: false,
              // drawBehind: true,
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
export const completeRegisterScreen = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'CompleteRegister',
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
      backgroundColor: colors.secondary,
    },
  });
};
export const completeTruckerRegisterScreen = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'CompleteTruckerRegister',
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
      backgroundColor: colors.secondary,
    },
  });
};

export const homeScreen = () => {
  Promise.all([
    Icons.getImageSource('home', 40),
    Icons.getImageSource('CodeSandbox', 40),
    Icons.getImageSource('plussquare', 50),
    Icons.getImageSource('bells', 40),
    Icons.getImageSource('user', 40),
  ]).then(([home, orderHistory, order, notifications, user]) => {
    Navigation.setRoot({
      root: {
        sideMenu: {
          center: {
            bottomTabs: {
              id: 'bottomtab',
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
                              text: 'Trang chủ',
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
                              text: 'Đơn hàng',
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
                              iconHeight: 45,
                              iconWidth: 45,
                              icon: order,
                              iconColor: colors.primary,
                            },
                            // bottomTabs: {
                            //   titleDisplayMode: 'alwaysHide',
                            // },
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
                          id: 'notifications',
                          name: 'Notification',
                          options: {
                            topBar: {
                              visible: false,
                            },
                            bottomTab: {
                              icon: notifications,
                              text: 'Thông báo',
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
                              text: 'Tài khoản',
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
        textColor: 'black',
        iconColor: 'black',
        selectedIconColor: colors.primary,
        selectedTextColor: colors.primary,
      },
      bottomTabs: {
        visible: false,
        animate: false,
        elevation: 10,
        titleDisplayMode: 'alwaysShow',
        preferLargeIcons: true,
        // backgroundColor: '#dbc5fe',
        animateTabSelection: false,
      },
    });
  });
};

export const homeTruckerScreen = () => {
  Promise.all([
    Icons.getImageSource('home', 40),
    Icons.getImageSource('copy1', 40),
    Icons.getImageSource('bells', 40),
    Icons.getImageSource('user', 40),
  ]).then(([home, orderHistory, notifications, user]) => {
    Navigation.setRoot({
      root: {
        sideMenu: {
          center: {
            bottomTabs: {
              id: 'bottomtab',
              children: [
                {
                  stack: {
                    children: [
                      {
                        component: {
                          id: 'home',
                          name: 'TruckerHome',
                          options: {
                            topBar: {
                              visible: false,
                            },
                            bottomTab: {
                              icon: home,
                              text: 'Trang chủ',
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
                          name: 'TruckerOrder',
                          options: {
                            topBar: {
                              visible: false,
                            },
                            visible: false,
                            bottomTab: {
                              icon: orderHistory,
                              text: 'Đơn hàng',
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
                          name: 'TruckerNotification',
                          options: {
                            topBar: {
                              visible: false,
                            },
                            bottomTab: {
                              icon: notifications,
                              text: 'Thông báo',
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
                          name: 'TruckerProfile',
                          options: {
                            topBar: {
                              visible: false,
                            },
                            bottomTab: {
                              icon: user,
                              text: 'Tài khoản',
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
        backgroundColor: colors.secondary,
      },
      bottomTab: {
        textColor: 'black',
        iconColor: 'black',
        selectedIconColor: colors.secondary,
        selectedTextColor: colors.secondary,
      },
      bottomTabs: {
        animate: false,
        elevation: 5,
        titleDisplayMode: 'alwaysShow',
        // backgroundColor: '#dbc5fe',
        // animateTabSelection: true,
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
