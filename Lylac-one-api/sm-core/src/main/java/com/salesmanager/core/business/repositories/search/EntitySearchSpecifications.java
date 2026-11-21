package com.salesmanager.core.business.repositories.search;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Objects;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;

import org.springframework.data.jpa.domain.Specification;

import com.salesmanager.core.model.catalog.product.Product;
import com.salesmanager.core.model.catalog.product.manufacturer.Manufacturer;
import com.salesmanager.core.model.customer.Customer;
import com.salesmanager.core.model.order.Order;
import com.salesmanager.core.model.order.orderstatus.OrderStatus;

public final class EntitySearchSpecifications {

	private EntitySearchSpecifications() {
	}

	public static Specification<Manufacturer> manufacturer(Integer storeId, Integer languageId,
			String name) {
		Objects.requireNonNull(storeId, "storeId");
		return (root, query, builder) -> {
			List<Predicate> predicates = new ArrayList<>();
			predicates.add(builder.equal(root.join("merchantStore").get("id"), storeId));
			Join<Manufacturer, ?> description = root.join("descriptions", JoinType.LEFT);
			if (languageId != null) {
				predicates.add(builder.equal(description.get("language").get("id"), languageId));
			}
			if (name != null) {
				predicates.add(builder.like(description.<String>get("name"), "%" + name + "%"));
			}

			return builder.and(predicates.toArray(new Predicate[0]));
		};
	}

	public static Specification<Product> product(Integer storeId, String sku, Boolean available,
			Date availableFrom, Date availableTo) {
		Objects.requireNonNull(storeId, "storeId");
		return (root, query, builder) -> {
			List<Predicate> predicates = new ArrayList<>();
			predicates.add(builder.equal(root.join("merchantStore").get("id"), storeId));

			if (hasText(sku)) {
				predicates.add(builder.equal(root.<String>get("sku"), sku));
			}
			if (available != null) {
				predicates.add(builder.equal(root.<Boolean>get("available"), available));
			}
			if (availableFrom != null) {
				predicates.add(builder.greaterThanOrEqualTo(root.<Date>get("dateAvailable"), availableFrom));
			}
			if (availableTo != null) {
				predicates.add(builder.lessThanOrEqualTo(root.<Date>get("dateAvailable"), availableTo));
			}

			return builder.and(predicates.toArray(new Predicate[0]));
		};
	}

	public static Specification<Customer> customer(Integer storeId, String email, String nickname) {
		Objects.requireNonNull(storeId, "storeId");
		return (root, query, builder) -> {
			List<Predicate> predicates = new ArrayList<>();
			predicates.add(builder.equal(root.join("merchantStore").get("id"), storeId));

			if (hasText(email)) {
				predicates.add(containsIgnoreCase(builder, root.<String>get("emailAddress"), email));
			}
			if (hasText(nickname)) {
				predicates.add(containsIgnoreCase(builder, root.<String>get("nick"), nickname));
			}

			return builder.and(predicates.toArray(new Predicate[0]));
		};
	}

	public static Specification<Order> orders(Integer storeId, Date purchasedFrom, Date purchasedTo,
			OrderStatus status, Boolean confirmedAddress, BigDecimal minimumTotal,
			BigDecimal maximumTotal) {
		Objects.requireNonNull(storeId, "storeId");
		return (root, query, builder) -> {
			List<Predicate> predicates = new ArrayList<>();
			predicates.add(builder.equal(root.join("merchant").get("id"), storeId));

			if (purchasedFrom != null) {
				predicates.add(builder.greaterThanOrEqualTo(root.<Date>get("datePurchased"), purchasedFrom));
			}
			if (purchasedTo != null) {
				predicates.add(builder.lessThanOrEqualTo(root.<Date>get("datePurchased"), purchasedTo));
			}
			if (status != null) {
				predicates.add(builder.equal(root.<OrderStatus>get("status"), status));
			}
			if (confirmedAddress != null) {
				predicates.add(builder.equal(root.<Boolean>get("confirmedAddress"), confirmedAddress));
			}
			if (minimumTotal != null) {
				predicates.add(builder.greaterThanOrEqualTo(root.<BigDecimal>get("total"), minimumTotal));
			}
			if (maximumTotal != null) {
				predicates.add(builder.lessThanOrEqualTo(root.<BigDecimal>get("total"), maximumTotal));
			}

			return builder.and(predicates.toArray(new Predicate[0]));
		};
	}

	public static Predicate containsIgnoreCase(CriteriaBuilder builder, Path<String> field, String value) {
		return builder.like(builder.lower(field), "%" + value.toLowerCase(Locale.ROOT) + "%");
	}

	private static boolean hasText(String value) {
		return value != null && !value.isEmpty();
	}
}
