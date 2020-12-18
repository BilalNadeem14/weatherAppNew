import { StyleSheet } from 'react-native';

// import vw from '../../../Units/vw';
// import vh from '../../../Units/vh';
// import { Fonts } from '../../../assets/Fonts';
import { vh, vw } from '../../units';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 10000,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: vw * 100,
  },
  contentContainer: {
    width: vw * 90,
    // alignSelf: 'center',
    // elevation: 100,
    borderRadius: 10 * vw,
    borderTopLeftRadius: 10 * vw,
    borderTopRightRadius: 10 * vw,
    backgroundColor: 'white',
    marginHorizontal: 5 * vw
    // height: 50 * vh
    // paddingTop: 2 * vw,
    // paddingBottom: 2 * vw,
  },
  contentMainrow: {
    width: '100%',
    paddingHorizontal: 10 * vw,
    marginTop: vh * 5,
    marginBottom: vh * 3,
    // borderWidth: 1 * vw,
    height: 50 * vh,
  },
  modalTopImg: {
    width: 20 * vw,
    height: 11 * vh,
    resizeMode: 'contain',
    borderRadius: 7 * vw,
  },
  nametext: {
    color: '#003333',
    fontSize: 5.2 * vw,
    // fontFamily: Fonts.poppinsMedium,
    fontWeight: 'bold',
    width: '80%',
    marginBottom: vh * 2,
  },
  text: {
    color: '#999999',
    fontSize: 3.5 * vw,
    lineHeight: 4 * vw,
    // fontFamily: Fonts.KR,
  },
  lvel: {
    color: '#EE3048',
    fontSize: 3.5 * vw,
    lineHeight: 4 * vw,
    // fontFamily: Fonts.KM,
  },
  contentBottomrow: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  contentBottomrowinner: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  modallogoImg: {
    width: 15 * vw,
    height: 7 * vh,
    resizeMode: 'contain',
    borderRadius: 7 * vw,
    // marginBottom: 2*vw,
  },
  lvelBottom: {
    color: '#EE3048',
    fontSize: 8 * vw,
    // fontFamily: Fonts.KM,
  },
});
