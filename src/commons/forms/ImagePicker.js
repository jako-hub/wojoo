import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Image,
} from 'react-native';
import {
    View, Picker,
} from 'native-base';
import PrettyButton from './PrettyButton';
import defaultImage from '../../assets/images/default-clan-image.png';
// import PickerPlugin from 'react-native-image-picker';
//import PickerPlugin from 'react-native-image-crop-picker';
import PickerPlugin from 'react-native-image-picker';

const ImagePreview = ({imgSrc}) => (
    <View style = { styles.imagePreviewWrapper }>
        <Image style = { styles.imagePreview } source = { imgSrc } />
    </View>
);

class ImagePicker extends React.PureComponent {
    
    onSelectImage() {
       const {
        selectImageLabel = "Selecciona una imagen",
        onSelectImage,
    } = this.props;

    const options = {
            title: selectImageLabel,
            storageOptions: {
                skipBackup: true,
                //path: 'images',
            },
        };

        PickerPlugin.showImagePicker(options, (response) => {          
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                if(onSelectImage) {
                    onSelectImage(response);
                }
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
            }
          });
    }

    render() {
        const {imgSrc} = this.props;
        return (
            <View style = { styles.root }>
                <View style = { styles.wrapper }>
                    <ImagePreview imgSrc={ imgSrc? imgSrc : defaultImage } />
                    <PrettyButton onPress = { () => this.onSelectImage() }>
                        Seleccionar imagen
                    </PrettyButton>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root : {
        flexDirection   : "row",
        justifyContent  : "center",
        marginBottom    : 10,
    },
    imagePreviewWrapper : {
        borderRadius    : 150,
        backgroundColor : "#e0e0e0",
        alignSelf       : "center",
        padding         : 5,
        marginBottom    : 10,
    },
    imagePreview : {
        width           : 70,
        height          : 70,
        borderRadius    : 150,
        opacity         : 0.4,
    },
});

ImagePicker.propTypes = {
    onSelectImage : PropTypes.func,
};

export default ImagePicker;