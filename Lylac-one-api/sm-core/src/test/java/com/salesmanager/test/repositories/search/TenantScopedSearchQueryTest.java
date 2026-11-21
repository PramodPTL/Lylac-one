package com.salesmanager.test.repositories.search;

import static org.junit.Assert.assertTrue;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.junit.Test;
import org.springframework.test.util.ReflectionTestUtils;

import com.salesmanager.core.business.repositories.customer.CustomerRepositoryImpl;
import com.salesmanager.core.business.repositories.order.OrderRepositoryImpl;
import com.salesmanager.core.model.customer.CustomerCriteria;
import com.salesmanager.core.model.merchant.MerchantStore;
import com.salesmanager.core.model.order.OrderCriteria;

public class TenantScopedSearchQueryTest {

	@Test
	public void customerNameFiltersRemainScopedToTheStore() {
		EntityManager entityManager = mock(EntityManager.class);
		Query countQuery = mock(Query.class);
		Query resultQuery = mock(Query.class);
		when(entityManager.createQuery(anyString())).thenReturn(countQuery, resultQuery);
		when(countQuery.setParameter(anyString(), org.mockito.ArgumentMatchers.any()))
				.thenReturn(countQuery);
		when(resultQuery.setParameter(anyString(), org.mockito.ArgumentMatchers.any()))
				.thenReturn(resultQuery);
		when(countQuery.getSingleResult()).thenReturn(0L);

		CustomerRepositoryImpl repository = new CustomerRepositoryImpl();
		ReflectionTestUtils.setField(repository, "em", entityManager);

		MerchantStore store = mock(MerchantStore.class);
		when(store.getId()).thenReturn(7);
		CustomerCriteria criteria = new CustomerCriteria();
		criteria.setName("smith");
		criteria.setFirstName("ann");

		repository.listByStore(store, criteria);

		org.mockito.ArgumentCaptor<String> queryCaptor =
				org.mockito.ArgumentCaptor.forClass(String.class);
		verify(entityManager, times(2)).createQuery(queryCaptor.capture());
		for (String query : queryCaptor.getAllValues()) {
			assertTrue(query.contains("where c.merchantStore.id=:mId"));
			assertTrue(query.contains(
					"and (c.billing.firstName like:nm or c.billing.lastName like:nm)"));
			assertTrue(query.contains("and c.billing.firstName like:fn"));
			assertTrue(!query.contains("c..billing"));
		}
	}

	@Test
	public void orderNameAndPhoneAlternativesRemainScopedToTheStore() {
		EntityManager entityManager = mock(EntityManager.class);
		Query countQuery = mock(Query.class);
		Query resultQuery = mock(Query.class);
		when(entityManager.createQuery(anyString())).thenReturn(countQuery, resultQuery);
		when(countQuery.setParameter(anyString(), org.mockito.ArgumentMatchers.any()))
				.thenReturn(countQuery);
		when(resultQuery.setParameter(anyString(), org.mockito.ArgumentMatchers.any()))
				.thenReturn(resultQuery);
		when(countQuery.getSingleResult()).thenReturn(0L);

		OrderRepositoryImpl repository = new OrderRepositoryImpl();
		ReflectionTestUtils.setField(repository, "em", entityManager);

		MerchantStore store = mock(MerchantStore.class);
		when(store.getCode()).thenReturn("store");
		OrderCriteria criteria = new OrderCriteria();
		criteria.setCustomerName("smith");
		criteria.setCustomerPhone("555");

		repository.listOrders(store, criteria);

		org.mockito.ArgumentCaptor<String> queryCaptor =
				org.mockito.ArgumentCaptor.forClass(String.class);
		verify(entityManager, times(2)).createQuery(queryCaptor.capture());
		for (String query : queryCaptor.getAllValues()) {
			assertTrue(query.contains("where o.merchant.code=:mCode"));
			assertTrue(query.contains(
					"and (o.billing.firstName like:name or o.billing.lastName like:name)"));
			assertTrue(query.contains(
					"and (o.billing.telephone like:phone or o.delivery.telephone like:phone)"));
		}
	}

	@Test
	public void legacyOrderNameAlternativesRemainScopedToTheStore() {
		EntityManager entityManager = mock(EntityManager.class);
		Query countQuery = mock(Query.class);
		Query resultQuery = mock(Query.class);
		when(entityManager.createQuery(anyString())).thenReturn(countQuery, resultQuery);
		when(countQuery.setParameter(anyString(), org.mockito.ArgumentMatchers.any()))
				.thenReturn(countQuery);
		when(resultQuery.setParameter(anyString(), org.mockito.ArgumentMatchers.any()))
				.thenReturn(resultQuery);
		when(countQuery.getSingleResult()).thenReturn(0L);

		OrderRepositoryImpl repository = new OrderRepositoryImpl();
		ReflectionTestUtils.setField(repository, "em", entityManager);

		MerchantStore store = mock(MerchantStore.class);
		when(store.getId()).thenReturn(7);
		OrderCriteria criteria = new OrderCriteria();
		criteria.setCustomerName("smith");

		repository.listByStore(store, criteria);

		org.mockito.ArgumentCaptor<String> queryCaptor =
				org.mockito.ArgumentCaptor.forClass(String.class);
		verify(entityManager, times(2)).createQuery(queryCaptor.capture());
		for (String query : queryCaptor.getAllValues()) {
			assertTrue(query.contains("where o.merchant.id=:mId"));
			assertTrue(query.contains(
					"and (o.billing.firstName like:nm or o.billing.lastName like:nm)"));
		}
	}
}
