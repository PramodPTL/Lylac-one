package com.salesmanager.core.model.storefront;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "STORE_PAGE_SECTION", schema = "lylac_storefront")
public class StorePageSection implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "PAGE_ID", nullable = false)
    private Long pageId;

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

    @Column(name = "CONFIGURATION", columnDefinition = "jsonb")
    private String configuration;

    @Column(name = "DISPLAY_ORDER")
    private Integer displayOrder = 0;

    @Column(name = "IS_ACTIVE")
    private Boolean active = true;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "DATE_CREATED")
    private Date dateCreated;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "DATE_MODIFIED")
    private Date dateModified;

    @Column(name = "CREATED_BY")
    private Long createdBy;

    @Column(name = "MODIFIED_BY")
    private Long modifiedBy;

    @Column(name = "UPDT_ID", length = 60)
    private String updtId;

    public Long getId() {
        return id;
    }

    public Long getPageId() {
        return pageId;
    }

    public void setPageId(Long pageId) {
        this.pageId = pageId;
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

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public Date getDateModified() {
        return dateModified;
    }

    public Long getCreatedBy() {
        return createdBy;
    }

    public Long getModifiedBy() {
        return modifiedBy;
    }

    public String getUpdtId() {
        return updtId;
    }
}
