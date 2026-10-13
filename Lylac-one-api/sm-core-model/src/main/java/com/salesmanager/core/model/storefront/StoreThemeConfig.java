package com.salesmanager.core.model.storefront;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "STORE_THEME_CONFIG", schema = "lylac_storefront")
public class StoreThemeConfig extends StorefrontEntity {
    @javax.persistence.Column(name = "THEME_NAME", length = 100)
    private String themeName;
    @javax.persistence.Column(name = "PRIMARY_COLOR", length = 20)
    private String primaryColor;
    @javax.persistence.Column(name = "SECONDARY_COLOR", length = 20)
    private String secondaryColor;
    @javax.persistence.Column(name = "ACCENT_COLOR", length = 20)
    private String accentColor;
    @javax.persistence.Column(name = "BACKGROUND_COLOR", length = 20)
    private String backgroundColor;
    @javax.persistence.Column(name = "TEXT_COLOR", length = 20)
    private String textColor;
    @javax.persistence.Column(name = "FONT_FAMILY", length = 100)
    private String fontFamily;
    @javax.persistence.Column(name = "BORDER_RADIUS", length = 30)
    private String borderRadius;
    @javax.persistence.Column(name = "BUTTON_STYLE", length = 30)
    private String buttonStyle;
    @javax.persistence.Column(name = "CARD_STYLE", length = 30)
    private String cardStyle;
    @javax.persistence.Column(name = "HEADER_STYLE", length = 30)
    private String headerStyle;
    @javax.persistence.Column(name = "FOOTER_STYLE", length = 30)
    private String footerStyle;
    @javax.persistence.Column(name = "CUSTOM_CSS", columnDefinition = "text")
    private String customCss;

    public String getThemeName() {
        return themeName;
    }

    public void setThemeName(String value) {
        themeName = value;
    }

    public String getPrimaryColor() {
        return primaryColor;
    }

    public void setPrimaryColor(String value) {
        primaryColor = value;
    }

    public String getSecondaryColor() {
        return secondaryColor;
    }

    public void setSecondaryColor(String value) {
        secondaryColor = value;
    }

    public String getAccentColor() {
        return accentColor;
    }

    public void setAccentColor(String value) {
        accentColor = value;
    }

    public String getBackgroundColor() {
        return backgroundColor;
    }

    public void setBackgroundColor(String value) {
        backgroundColor = value;
    }

    public String getTextColor() {
        return textColor;
    }

    public void setTextColor(String value) {
        textColor = value;
    }

    public String getFontFamily() {
        return fontFamily;
    }

    public void setFontFamily(String value) {
        fontFamily = value;
    }

    public String getBorderRadius() {
        return borderRadius;
    }

    public void setBorderRadius(String value) {
        borderRadius = value;
    }

    public String getButtonStyle() {
        return buttonStyle;
    }

    public void setButtonStyle(String value) {
        buttonStyle = value;
    }

    public String getCardStyle() {
        return cardStyle;
    }

    public void setCardStyle(String value) {
        cardStyle = value;
    }

    public String getHeaderStyle() {
        return headerStyle;
    }

    public void setHeaderStyle(String value) {
        headerStyle = value;
    }

    public String getFooterStyle() {
        return footerStyle;
    }

    public void setFooterStyle(String value) {
        footerStyle = value;
    }

    public String getCustomCss() {
        return customCss;
    }

    public void setCustomCss(String value) {
        customCss = value;
    }
}
