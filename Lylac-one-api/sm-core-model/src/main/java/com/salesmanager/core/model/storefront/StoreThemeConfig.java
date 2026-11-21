package com.salesmanager.core.model.storefront;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.salesmanager.core.model.merchant.MerchantStore;

@Entity
@Table(
        name = "STORE_THEME_CONFIG",
        schema = "lylac_storefront",
        indexes = {
                @Index(
                        name = "IDX_THEME_CONFIG_STORE",
                        columnList = "MERCHANT_ID"
                )
        }
)
public class StoreThemeConfig extends StorefrontEntity {

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "MERCHANT_ID",
            nullable = false,
            unique = true
    )
    private MerchantStore merchantStore;

    @Column(name = "THEME_NAME", length = 100)
    private String themeName;

    @Column(name = "PRIMARY_COLOR", length = 20)
    private String primaryColor;

    @Column(name = "SECONDARY_COLOR", length = 20)
    private String secondaryColor;

    @Column(name = "ACCENT_COLOR", length = 20)
    private String accentColor;

    @Column(name = "BACKGROUND_COLOR", length = 20)
    private String backgroundColor;

    @Column(name = "TEXT_COLOR", length = 20)
    private String textColor;

    @Column(name = "FONT_FAMILY", length = 100)
    private String fontFamily;

    @Column(name = "BORDER_RADIUS", length = 30)
    private String borderRadius;

    @Column(name = "BUTTON_STYLE", length = 30)
    private String buttonStyle;

    @Column(name = "CARD_STYLE", length = 30)
    private String cardStyle;

    @Column(name = "HEADER_STYLE", length = 30)
    private String headerStyle;

    @Column(name = "FOOTER_STYLE", length = 30)
    private String footerStyle;

    @Column(name = "CUSTOM_CSS", columnDefinition = "text")
    private String customCss;

    public MerchantStore getMerchantStore() {
        return merchantStore;
    }

    public void setMerchantStore(MerchantStore merchantStore) {
        this.merchantStore = merchantStore;
    }

    public String getThemeName() {
        return themeName;
    }

    public void setThemeName(String themeName) {
        this.themeName = themeName;
    }

    public String getPrimaryColor() {
        return primaryColor;
    }

    public void setPrimaryColor(String primaryColor) {
        this.primaryColor = primaryColor;
    }

    public String getSecondaryColor() {
        return secondaryColor;
    }

    public void setSecondaryColor(String secondaryColor) {
        this.secondaryColor = secondaryColor;
    }

    public String getAccentColor() {
        return accentColor;
    }

    public void setAccentColor(String accentColor) {
        this.accentColor = accentColor;
    }

    public String getBackgroundColor() {
        return backgroundColor;
    }

    public void setBackgroundColor(String backgroundColor) {
        this.backgroundColor = backgroundColor;
    }

    public String getTextColor() {
        return textColor;
    }

    public void setTextColor(String textColor) {
        this.textColor = textColor;
    }

    public String getFontFamily() {
        return fontFamily;
    }

    public void setFontFamily(String fontFamily) {
        this.fontFamily = fontFamily;
    }

    public String getBorderRadius() {
        return borderRadius;
    }

    public void setBorderRadius(String borderRadius) {
        this.borderRadius = borderRadius;
    }

    public String getButtonStyle() {
        return buttonStyle;
    }

    public void setButtonStyle(String buttonStyle) {
        this.buttonStyle = buttonStyle;
    }

    public String getCardStyle() {
        return cardStyle;
    }

    public void setCardStyle(String cardStyle) {
        this.cardStyle = cardStyle;
    }

    public String getHeaderStyle() {
        return headerStyle;
    }

    public void setHeaderStyle(String headerStyle) {
        this.headerStyle = headerStyle;
    }

    public String getFooterStyle() {
        return footerStyle;
    }

    public void setFooterStyle(String footerStyle) {
        this.footerStyle = footerStyle;
    }

    public String getCustomCss() {
        return customCss;
    }

    public void setCustomCss(String customCss) {
        this.customCss = customCss;
    }
}