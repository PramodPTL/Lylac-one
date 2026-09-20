package com.salesmanager.core.repositories.storefront;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.salesmanager.core.model.storefront.StoreSocialLink;

public interface StoreSocialLinkRepository extends JpaRepository<StoreSocialLink, Long> {
	List<StoreSocialLink> findByMerchantIdAndActiveTrueOrderByDisplayOrderAsc(Integer merchantId);
	List<StoreSocialLink> findByMerchantIdOrderByDisplayOrderAsc(Integer merchantId);
}
