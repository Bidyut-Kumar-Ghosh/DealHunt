import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

type KifayatiLogoProps = {
    size?: 'small' | 'medium' | 'large';
};

const KifayatiLogo: React.FC<KifayatiLogoProps> = ({ size = 'medium' }) => {
    const iconSize = size === 'small' ? 30 : size === 'medium' ? 40 : 50;
    const textSize = size === 'small' ? 14 : size === 'medium' ? 18 : 22;
    const specialTextSize = size === 'small' ? 16 : size === 'medium' ? 22 : 26;
    const wheelSize = size === 'small' ? 12 : size === 'medium' ? 16 : 20;
    const lineWidth = size === 'small' ? 15 : size === 'medium' ? 20 : 25;

    return (
        <View style={styles.logoContainer}>
            {/* Motion lines */}
            <View style={styles.motionContainer}>
                <View style={[styles.motionLine, { width: lineWidth, top: iconSize * 0.2 }]} />
                <View style={[styles.motionLine, { width: lineWidth * 1.3, top: iconSize * 0.5 }]} />
                <View style={[styles.motionLine, { width: lineWidth, top: iconSize * 0.8 }]} />
            </View>

            {/* Shopping cart */}
            <View style={styles.cartContainer}>
                <FontAwesome name="shopping-cart" size={iconSize} color="#FF9800" style={styles.logoIcon} />

                {/* Wheels */}
                <View style={styles.wheelsContainer}>
                    <View style={[styles.wheel, { width: wheelSize, height: wheelSize }]} />
                    <View style={[styles.wheel, { width: wheelSize, height: wheelSize, marginLeft: iconSize * 0.5 }]} />
                </View>
            </View>

            {/* Logo text */}
            <View style={styles.logoTextContainer}>
                <Text style={[styles.logoText, { fontSize: textSize }]}>KIFAYATI</Text>
                <View style={styles.logoBottomContainer}>
                    <Text style={[styles.logoText, { fontSize: textSize }]}>B</Text>
                    <Text style={[styles.logoText, styles.logoTextSpecial, { fontSize: specialTextSize }]}>A</Text>
                    <Text style={[styles.logoText, { fontSize: textSize }]}>ZAR.COM</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#000',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 8,
        position: 'relative',
    },
    motionContainer: {
        position: 'absolute',
        left: 0,
        height: '100%',
    },
    motionLine: {
        height: 3,
        backgroundColor: '#FF9800',
        position: 'absolute',
        left: -15,
        borderRadius: 2,
    },
    cartContainer: {
        position: 'relative',
        marginRight: 10,
    },
    logoIcon: {
        marginRight: 0,
    },
    wheelsContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: -5,
        left: 0,
    },
    wheel: {
        borderRadius: 50,
        backgroundColor: '#FF9800',
    },
    logoTextContainer: {
        flexDirection: 'column',
    },
    logoBottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    logoTextSpecial: {
        color: '#FF9800',
    },
});

export default KifayatiLogo; 