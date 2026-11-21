package com.salesmanager.core.model.storefront;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.*;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
@Entity
@Table(
        name = "STORE_PAGE_SECTION",
        schema = "lylac_storefront",
        indexes = {
                @Index(
                        name = "IDX_PAGE_SECTION_PAGE",
                        columnList = "PAGE_ID"
                )
        }
)
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
public class StorePageSection extends StorefrontEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "PAGE_ID", nullable = false)
    private StorePage page;

    @Column(name = "SECTION_TYPE", length = 50)
    private String sectionType;

    @Column(name = "TITLE", length = 255)
    private String title;

    @Column(name = "SUBTITLE", length = 500)
    private String subtitle;

    @Column(name = "IMAGE_URL", length = 500)
    private String imageUrl;

    @Column(name = "CONTENT", columnDefinition = "text")
    private String content;

    @Type(type = "jsonb")
    @Column(name = "CONFIGURATION", columnDefinition = "jsonb")
    private String configuration;

    @Column(name = "DISPLAY_ORDER", nullable = false)
    private Integer displayOrder = 0;

    @Column(name = "IS_ACTIVE", nullable = false)
    private boolean active = true;

    public StorePage getPage() {
        return page;
    }

    public void setPage(StorePage page) {
        this.page = page;
    }

    public String getSectionType() {
        return sectionType;
    }

    public void setSectionType(String sectionType) {
        this.sectionType = sectionType;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getConfiguration() {
        return configuration;
    }

    public void setConfiguration(String configuration) {
        this.configuration = configuration;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
