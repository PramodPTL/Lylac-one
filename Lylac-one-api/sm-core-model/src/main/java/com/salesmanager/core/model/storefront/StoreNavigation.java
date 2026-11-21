package com.salesmanager.core.model.storefront;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import com.salesmanager.core.model.merchant.MerchantStore;

@Entity
@Table(
        name = "STORE_NAVIGATION",
        schema = "lylac_storefront",
        indexes = {
                @Index(
                        name = "IDX_NAVIGATION_STORE",
                        columnList = "MERCHANT_ID"
                )
        }
)
public class StoreNavigation extends StorefrontEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "MERCHANT_ID", nullable = false)
    private MerchantStore merchantStore;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_ID")
    private StoreNavigation parent;

    @OneToMany(mappedBy = "parent")
    private Set<StoreNavigation> children = new HashSet<>();

    @NotBlank
    @Column(name = "LABEL", length = 100, nullable = false)
    private String label;

    @Column(name = "URL", length = 500)
    private String url;

    @Column(name = "ICON", length = 100)
    private String icon;

    @Column(name = "DISPLAY_ORDER", nullable = false)
    private Integer displayOrder = 0;

    @Column(name = "OPEN_NEW_TAB", nullable = false)
    private boolean openNewTab = false;

    @Column(name = "IS_ACTIVE", nullable = false)
    private boolean active = true;

    public MerchantStore getMerchantStore() {
        return merchantStore;
    }

    public void setMerchantStore(MerchantStore merchantStore) {
        this.merchantStore = merchantStore;
    }

    public StoreNavigation getParent() {
        return parent;
    }

    public void setParent(StoreNavigation parent) {
        this.parent = parent;
    }

    public Set<StoreNavigation> getChildren() {
        return children;
    }

    public void setChildren(Set<StoreNavigation> children) {
        this.children = children;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }

    public boolean isOpenNewTab() {
        return openNewTab;
    }

    public void setOpenNewTab(boolean openNewTab) {
        this.openNewTab = openNewTab;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}