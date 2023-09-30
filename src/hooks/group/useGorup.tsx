'use client';

import { shopClient } from '@/services/shop.service';
import {
  ShopApproveSchema,
  TShop,
  TShopApprove,
  TShopDisApprove,
  disApproveSchema,
} from '@/validations/shop';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { toast } from 'sonner';
import { useCurrentUser } from '../user/useCurrentUser';
import { useGlobalAlertStateStore } from '@/store/alerts';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGlobalModalStateStore } from '@/store/modal';
import { TGroup, groupsSchema } from '@/validations/groups';
import { groupClient } from '@/services/group.service';

export function useGroup() {
 
  const router = useRouter();
  const queryClient = useQueryClient();

 
 
  const {
    mutateAsync: GroupCreateMutation,
    isLoading: GroupCreateLoading,
    isError: IsGroupCreateError,
  } = useMutation(groupClient.groupCreate);
  const {
    mutateAsync: GroupUpdateMutation,
    isLoading: GroupUpdateLoading,
    isError: IsGroupUpdateError,
  } = useMutation(groupClient.updateGroup);

  const attemptGroupCreate = async (data: TGroup) => {
    toast.promise(GroupCreateMutation(data), {
      loading: 'creating...',
      success: data => {
        queryClient.invalidateQueries(['types']);
       router.push('/admin/groups');
        return <b>{data.message}</b>;
      },
      error: error => {
        const {
          response: { data },
        }: any = error ?? {};

        return <b> {data?.message}</b>;
      },
    });
  };
 

  return {
    attemptGroupCreate,
    GroupCreateLoading,
    IsGroupCreateError,
    GroupUpdateLoading,
    IsGroupUpdateError,
    GroupUpdateMutation,
   
  };
}
