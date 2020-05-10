import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

import BASE_COLOR, { GREEN_COLOR } from '../helpers';
import DetailsModal from '../components/DetailsModal';

let BeerTile = (props) => {
  let { item, clickable } = props;

  const [modalVisible, setModalVisible] = useState(false);

  if (modalVisible) {
    return <DetailsModal item={item} />;
  }

  const toggleModalVisible = () => {
    if (!clickable) {
      return;
    }

    setModalVisible(!modalVisible);
  };

  return (
    <TouchableWithoutFeedback onPress={toggleModalVisible}>
      <View style={styles.container}>
        <Image
          source={{ uri: item.image_url }}
          resizeMode='contain'
          style={styles.image}
        />
        <View style={{ flexShrink: 1 }}>
          <Text style={styles.text}>{item.name}</Text>

          {clickable && <Text style={styles.text}>{item.description}</Text>}

          <Text style={[styles.text, { color: GREEN_COLOR }]}>
            {`First brewed: ${item.first_brewed}`}
          </Text>

          {item.ingredients && (
            <Text style={styles.textItalic}>
              {`Yeast: ${item.ingredients.yeast}`}
            </Text>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const textStyle = {
  fontSize: 14,
  alignItems: 'center',
  color: BASE_COLOR,
};

const styles = StyleSheet.create({
  text: textStyle,
  textItalic: {
    ...textStyle,
    fontStyle: 'italic',
  },
  image: {
    height: 60,
    width: 60,
    marginRight: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
});

BeerTile.propTypes = {
  item: PropTypes.object.isRequired,
  clickable: PropTypes.bool,
};

export default BeerTile;
